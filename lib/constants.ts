/**
 * Babcock-specific option lists for the profile form.
 *
 * The shared option lists (tracks, skill levels, genders, statuses, months)
 * are owned by `lib/tracks.ts` — re-exported here so existing imports keep
 * working and there is a single source of truth. Only DEPARTMENTS, FACULTIES,
 * and TEAMS (curated Babcock data) live here.
 */

export {
  GENDERS,
  STUDENT_STATUSES,
  SKILL_LEVELS,
  MONTHS,
} from "@/lib/tracks";

import { TRACKS as TRACK_CONFIG } from "@/lib/tracks";

/** Track names as plain strings (the profile/registration selects expect this). */
export const TRACKS = TRACK_CONFIG.map((t) => t.value);

export const TEAMS = [
  "Software Development & Engineering",
  "Infrastructure & Security",
  "Data & AI",
  "Design & Management",
  "Media",
  "Content",
  "Events",
  "Community",
];

export const DEPARTMENTS = [
  "Accounting",
  "Agriculture",
  "Anatomy",
  "Animation & Motion Design",
  "Banking & Finance",
  "Biochemistry",
  "Biology",
  "Business Administration",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Communication & Media Studies",
  "Computer Engineering",
  "Computer Science",
  "Cybersecurity",
  "Data Science",
  "Economics",
  "Education",
  "Electrical & Electronics Engineering",
  "English",
  "Entrepreneurship",
  "Environmental Management",
  "Estate Management",
  "Film & Multimedia",
  "Food Science & Technology",
  "French",
  "Geology",
  "History",
  "Hospitality & Tourism",
  "Industrial Chemistry",
  "Information Technology",
  "International Relations",
  "Law",
  "Library Science",
  "Marketing",
  "Mass Communication",
  "Mathematics",
  "Mechanical Engineering",
  "Medical Laboratory Science",
  "Medicine & Surgery",
  "Microbiology",
  "Music",
  "Nursing",
  "Petroleum Engineering",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Physiology",
  "Political Science",
  "Psychology",
  "Public Administration",
  "Public Health",
  "Radiography",
  "Religious Studies",
  "Social Work",
  "Sociology",
  "Software Engineering",
  "Statistics",
  "Supply Chain Management",
  "Surveying & Geoinformatics",
  "Taxation",
  "Urban & Regional Planning",
];

export const FACULTIES = [
  "College of Health & Medical Sciences",
  "School of Agriculture",
  "School of Basic & Applied Sciences",
  "School of Computing & Engineering Sciences",
  "School of Education & Humanities",
  "School of Environmental Sciences",
  "School of Law",
  "School of Management Sciences",
  "School of Nursing",
  "School of Pharmacy",
  "School of Public & Allied Health",
  "School of Science & Technology",
  "School of Social Sciences",
  "Veritas Business School",
];
