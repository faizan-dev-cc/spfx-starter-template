import * as React from 'react';
import { CARD_LINK } from './lib/enums';

export function CourseCard({ course }: any) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);

        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
        return formattedDate
    }
    return <div className="card" key={course.id}>
        <a href={CARD_LINK + course.id} target="_blank" rel="noopener noreferrer" data-interception="off">
            <img src={course.image} alt={course.title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{course.title}Yooo</h3>
                <p className="card-description">{course.description}</p>
                <p className="card-time">{formatDate(course.startDate)} - {formatDate(course.endDate)}</p>
                <p className="card-number">
                    Course#{course.number}
                    <small>{course.duration} Duration</small>
                </p>
            </div>
        </a>
    </div>
}