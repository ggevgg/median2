import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/auth/guards/role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mime = require('mime-types');

const DEST = './upload';
const MAX_SIZE = 1000000;
const FILE_TYPE = 'jpeg|png';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: DEST,
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: FILE_TYPE,
        })
        .addMaxSizeValidator({
          maxSize: MAX_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const result = await this.imagesService.createMany(
      files.map(({ filename: url }) => ({ url })),
    );
    return result;
  }

  @Get(':filename')
  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  getFile(@Param('filename') filename: string, @Res() response: Response) {
    const fullPath = `${DEST}/${filename}`;
    // todo change to async
    if (existsSync(fullPath)) {
      const file = createReadStream(fullPath);
      const mimeType = mime.lookup(filename) || 'images/jpeg';
      response.contentType(mimeType);
      file.pipe(response);
    } else {
      response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOkResponse()
  getImageList() {
    return this.imagesService.getImageList();
  }
}
