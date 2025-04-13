import * as React from 'react';
import { useEffect, useState } from 'react';
import { setupSP, getCourses } from './lib/service';
import { CourseCard } from './course-card';
import { SECTION_1_LINK, SECTION_2_LINK } from './lib/enums';
import "./style.css"

export default function CourseCatalog({ spContext, propPane }: any) {
  const [safetyCourses, setSafetyCourses] = useState([])
  const [proCourses, setProCourses] = useState([])
  const itemsToSlice = propPane.ItemsToShow == "all" ? 1000 : +propPane.ItemsToShow;
  const commonVisibility = propPane.visibleSections == "both"

  useEffect(() => {
    setupSP(spContext, propPane);
    getCourses(setSafetyCourses)
    getCourses(setProCourses, false)
  }, [propPane]);

  return <main className="lms-training-container">
    {(propPane.visibleSections == "general" || commonVisibility) && <>
      <div className="header">
        <h1 className="title">{propPane.heading1}</h1>
        {propPane.showViewAllLinks && <a href={SECTION_1_LINK} rel="noopener noreferrer" data-interception="off" className="view-all">View all</a>}
      </div>
      <div className="grid-container">
        {safetyCourses.slice(0, itemsToSlice).map((course: any) => <CourseCard course={course} />)}
      </div>
    </>}

    {(propPane.visibleSections == "upcoming" || commonVisibility) && <>
      <div className="header" style={{ marginTop: "2rem" }}>
        <h1 className="title">{propPane.heading2}</h1>
        {propPane.showViewAllLinks && <a href={SECTION_2_LINK} rel="noopener noreferrer" data-interception="off" className="view-all">View all</a>}
      </div>
      <div className="grid-container">
        {proCourses.slice(0, itemsToSlice).map((course: any) => <CourseCard course={course} />)}
      </div>
    </>}
  </main>
}
