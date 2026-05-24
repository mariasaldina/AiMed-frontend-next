import { MessageDto } from '@/shared/api/dtos';

export interface SendMessageResponseDto {
    userMessage: MessageDto;
    assistantMessage: MessageDto;
}
