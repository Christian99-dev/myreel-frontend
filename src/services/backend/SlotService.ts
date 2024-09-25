// services/backend/EditSlotService.ts

import { BaseService, ResponseHandler } from "@/services/backend/Base";
import {
  AddSlotRequest,
  AddSlotResponse,
  ChangeSlotRequest,
  ChangeSlotResponse,
  DeleteSlotResponse,
  PreviewSlotRequest,
} from "@/types/SlotService";
import axios, { AxiosRequestConfig } from "axios";

export class EditSlotService extends BaseService {
  constructor() {
    super("/edit");
  }

  addSlot(
    edit_id: number,
    slot_id: number,
    data: AddSlotRequest
  ): ResponseHandler<AddSlotResponse> {
    const formData = new FormData();
    formData.append("start_time", data.start_time.toString());
    formData.append("end_time", data.end_time.toString());
    formData.append("video_file", data.video_file);

    return this.postFormData<AddSlotResponse>(
      `/${edit_id}/slot/${slot_id}`,
      formData
    );
  }

  deleteSlot(
    edit_id: number,
    occupied_slot_id: number
  ): ResponseHandler<DeleteSlotResponse> {
    return this.delete<DeleteSlotResponse>(
      `/${edit_id}/slot/${occupied_slot_id}`
    );
  }

  changeSlot(
    edit_id: number,
    occupied_slot_id: number,
    data: ChangeSlotRequest
  ): ResponseHandler<ChangeSlotResponse> {
    const formData = new FormData();
    formData.append("start_time", data.start_time.toString());
    formData.append("end_time", data.end_time.toString());
    formData.append("video_file", data.video_file);

    return this.putFormData<ChangeSlotResponse>(
      `/${edit_id}/slot/${occupied_slot_id}`,
      formData
    );
  }

  previewSlot(
    edit_id: number,
    slot_id: number,
    data: PreviewSlotRequest
  ): ResponseHandler<Blob> {
    const formData = new FormData();
    formData.append("start_time", data.start_time.toString());
    formData.append("end_time", data.end_time.toString());
    formData.append("video_file", data.video_file);

    return this.post<Blob>(
      `/${edit_id}/slot/${slot_id}/preview`,
      formData,
      {
        responseType: "blob",
      }
    );
  }

  // Hilfsmethoden für FormData-Anfragen
  private postFormData<T>(
    endpoint: string,
    formData: FormData
  ): ResponseHandler<T> {
    return this.request<T>("post", endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  private putFormData<T>(
    endpoint: string,
    formData: FormData
  ): ResponseHandler<T> {
    return this.request<T>("put", endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
