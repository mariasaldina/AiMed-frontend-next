import { MessageDto } from "@/shared/api/contracts/message.dto";

export interface SendMessageResponseDto {
    userMessage: MessageDto;
    assistantMessage: MessageDto;
}