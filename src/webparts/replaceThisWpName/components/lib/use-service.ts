import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import { LIST_NAME, SAMPLE_DATA } from "./enums";
import { logger } from "./utils";

export default function useService(props: any) {
    const { propPane } = props;
    const [items, setItems]: any = useState([]);

    const itemsToSlice = propPane.ItemsToShow == "all" ? 1000 : +propPane.ItemsToShow;
    const slicedItems = items.slice(0, itemsToSlice);

    useEffect(() => {
        // Initial Setup
        setupSP()

        // All other actions
        getItems()
    }, [])

    const setupSP = () => {
        sp.setup({ spfxContext: props.spContext });
        (window as any).replaceThisWpNameData = props
    }

    const getItems = async () => {
        try {
            // ---------------------------Use below logic for fetching-------------------------

            const { listName } = (window as any).replaceThisWpNameData
            const spList = listName || LIST_NAME;
            logger(`Fetching data from list "${spList}"...`)
            // const items = await sp.web.lists.getByTitle(spList).items
            //     .select("ID,ABC_Title,ABC_description,ABC_Type")
            //     .filter(`ABC_Type eq 'good' and ID ne 0`)
            //     .get();

            // setItems(items);

            // ---------------------Sample Data for demo-----------------------

            setItems(SAMPLE_DATA);
        } catch (e) {
            console.log("Error fetching items: ", e)
        }
    };

    const resetItems = () => setItems([])

    return {
        items: slicedItems,
        setItems,
        getItems,
        resetItems,
        itemsToSlice
    }
}

