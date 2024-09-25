import { BaseService, ResponseHandler } from "@/services/backend/Base";
import { FileCategory } from "@/types/FileServices";

export class FileService extends BaseService {
  constructor() {
    super("/files");
  }

  getFile(filename: string, fileType: FileCategory): ResponseHandler<Blob> {
    return this.request<Blob>(
      "get",
      `/${fileType}/${filename}`,
      undefined,
      {
        responseType: "blob",
      }
    );
  }
}
