import * as React from 'react';
import useService from './lib/use-service';
import CodeBox from './sub-components/code-box';
import ItemCard from './sub-components/item-card';
import "./ReplaceThisWpName.scss";

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

    <div className="mb-4 p-4 bg-slate-700 text-white rounded-xl shadow-xl">
      This is a sample typography designed with Tailwind CSS. It's upto you whether to use it or not. <br />
      By default its enabled. If you want to disable it and only work with Vanilla CSS then go to the
      <CodeBox>src/webparts/replaceThisWpName/components/ReplaceThisWpName.scss</CodeBox>
      and comment down or remove the lines <strong>2, 3 and 4</strong> and enable the lines <strong>13 to 17</strong>
      But if you wanna keep using it, <CodeBox>Tailwind CSS IntelliSense</CodeBox> extension is
      highly recommended ;)
    </div>

    <section className="grid-container">
      {items.map((item: any) => <ItemCard item={item} propPane={propPane} />)}
    </section>
  </main>
}
