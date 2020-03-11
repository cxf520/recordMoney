import recordStore from "@/store/recordStore";
import tabStore from "@/store/tabStore";

const store = {
    ...recordStore,
    ...tabStore
};
export default store;