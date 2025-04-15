import { sp } from "@pnp/sp/presets/all";
import { LIST_NAME, SAMPLE_DATA } from "./enums";
import { logger } from "./utils";

export const setupSP = (spfxContext: any, propPane: any) => {
    sp.setup({ spfxContext });
    (window as any).replaceThisWpNameData = propPane
}

export const getItems = async (callback: any) => {
    try {
        // ---------------------------Use below logic for fetching-------------------------

        const { listName } = (window as any).replaceThisWpNameData
        const spList = listName || LIST_NAME;
        logger(`Fetching data from list "${spList}"...`)
        // const items = await sp.web.lists.getByTitle(spList).items
        //     .select("ID,ABC_Title,ABC_description,ABC_Type")
        //     .filter(`ABC_Type eq 'good' and ID ne 0`)
        //     .get();

        // callback(items);

        // ---------------------Sample Data for demo-----------------------

        callback(SAMPLE_DATA);
    } catch (e) {
        console.log("Error fetching items: ", e)
    }
};
