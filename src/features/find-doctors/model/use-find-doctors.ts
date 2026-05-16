import { useStores } from '@/app/providers/StoreProvider';

const useFindDoctors = (chatId: number | null | undefined) => {
    const rootStore = useStores();

    const findDoctors = async () => {
        if (!chatId) return;
        await rootStore.messageStore.async.findDoctors(chatId);
    };

    return findDoctors;
};

export default useFindDoctors;
