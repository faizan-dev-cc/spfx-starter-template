import * as React from 'react';
import { CARD_LINK } from '../lib/enums';

export function ItemCard({ item, propPane }: any) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);

        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
        return formattedDate
    }
    return <div className="card" key={item.id}>
        <a href={CARD_LINK + item.id} target="_blank" rel="noopener noreferrer" data-interception="off">
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
                <p className="card-time">{formatDate(item.startDate)} - {formatDate(item.endDate)}</p>
                <p className="card-number">
                    Item#{item.number}
                    {propPane.showDuration ? <small>{item.duration} Duration</small> : null}
                </p>
            </div>
        </a>
    </div>
}