import { useStores } from '@/shared/hooks/use-stores';

const useFindDoctors = (chatId: number | null | undefined) => {
    const rootStore = useStores();

    const findDoctors = async () => {
        if (!chatId) return;
        try {
            await rootStore.messageStore.async.findDoctors(chatId);
        } catch (e) {
            console.log(e);
        }
    };

    return findDoctors;
};

export default useFindDoctors;
