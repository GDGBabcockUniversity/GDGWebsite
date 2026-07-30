import teamMemberProfile from "./teamMemberProfile";
import gallery from "./gallery";
import galleryImage from "./galleryImage";
import gicipCohort from "./gicipCohort";
import gicipHost from "./gicipHost";
import gicipParticipant from "./gicipParticipant";

// The types this Studio owns. The dataset is shared with RADAR, whose Studio
// declares its own separate list, so each Studio only surfaces its own content.
export const schemaTypes = [
  teamMemberProfile,
  gicipCohort,
  gicipHost,
  gicipParticipant,
  gallery,
  galleryImage,
];
