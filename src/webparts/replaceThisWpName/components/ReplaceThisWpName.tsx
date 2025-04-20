import * as React from 'react';
import useService from './lib/use-service';
import { ItemCard } from './sub-components/item-card';
import "./ReplaceThisWpName.scss"

export default function ReplaceThisWpName(props: any) {
  const { propPane } = props;
  const {
    items,
    // setItems,
    // getItems,
    // resetItems,
  } = useService(props);


  return <main id="replace-this-wp-name-main">
    <div className="header">
      <h1 className="title">Welcome To Your New Webpart!</h1>
    </div>
    <section className="grid-container">
      {items.map((item: any) => <ItemCard item={item} propPane={propPane} />)}
    </section>
  </main>
}
