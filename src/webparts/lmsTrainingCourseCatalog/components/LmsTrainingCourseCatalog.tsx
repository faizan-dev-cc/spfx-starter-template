import * as React from 'react';
import { useEffect, useState } from 'react';
import { setupSP, getItems } from './lib/service';
import { ItemCard } from './sub-components/item-card';
import "./style.css"

export default function CourseCatalog({ spContext, propPane }: any) {
  const [items, setItems] = useState([])
  const itemsToSlice = propPane.ItemsToShow == "all" ? 1000 : +propPane.ItemsToShow;

  useEffect(() => {
    setupSP(spContext, propPane);
    getItems(setItems)
  }, [propPane]);

  return <main id="replace-this-wp-name-main">
    <div className="header">
      <h1 className="title">My Items</h1>
    </div>
    <div className="grid-container">
      {items.slice(0, itemsToSlice).map((item: any) => <ItemCard item={item} propPane={propPane} />)}
    </div>
  </main>
}
