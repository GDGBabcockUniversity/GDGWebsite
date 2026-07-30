import type { StructureResolver } from "sanity/structure";

// Studio desk for gdgbabcock.com. Teams are grouped by year so the serving
// team is one click away and past years stay browsable.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("GDG Babcock")
    .items([
      S.listItem()
        .title("Team")
        .child(
          S.list()
            .title("Team")
            .items([
              S.listItem()
                .title("Current team")
                .child(
                  S.documentList()
                    .title("Current team")
                    .filter('_type == "teamMemberProfile" && teamYear == "current"')
                    .defaultOrdering([
                      { field: "section", direction: "asc" },
                      { field: "displayOrder", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("Past teams")
                .child(
                  S.documentList()
                    .title("Past teams")
                    .filter('_type == "teamMemberProfile" && teamYear != "current"')
                    .defaultOrdering([
                      { field: "teamYear", direction: "desc" },
                      { field: "displayOrder", direction: "asc" },
                    ]),
                ),
              S.documentTypeListItem("teamMemberProfile").title("Everyone"),
            ]),
        ),

      S.divider(),

      S.documentTypeListItem("gicipCohort").title("GICIP Cohorts"),
      S.documentTypeListItem("gallery").title("Galleries"),
    ]);
