import ExcelJS from "exceljs";

class RegistrationExport {
  /**
   * --------------------------------------------------------
   * Generate Registration Excel Workbook
   * --------------------------------------------------------
   */
  async generate(registrations) {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "MRCE SIH Portal";
    workbook.lastModifiedBy = "MRCE SIH Portal";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Registrations", {
      views: [
        {
          state: "frozen",
          ySplit: 4,
        },
      ],
    });

    /**
     * --------------------------------------------------------
     * Title
     * --------------------------------------------------------
     */

    worksheet.mergeCells("A1:AG1");
    worksheet.getCell("A1").value =
      "MALLA REDDY COLLEGE OF ENGINEERING";

    worksheet.getCell("A1").font = {
      size: 18,
      bold: true,
    };

    worksheet.getCell("A1").alignment = {
      horizontal: "center",
    };

    worksheet.mergeCells("A2:AG2");
    worksheet.getCell("A2").value =
      "Internal Smart India Hackathon 2026 - Registration Report";

    worksheet.getCell("A2").font = {
      size: 14,
      bold: true,
    };

    worksheet.getCell("A2").alignment = {
      horizontal: "center",
    };

    worksheet.mergeCells("A3:AG3");
    worksheet.getCell("A3").value =
      `Generated On: ${new Date().toLocaleString()}`;

    worksheet.getCell("A3").alignment = {
      horizontal: "center",
    };

    /**
     * --------------------------------------------------------
     * Header Row
     * --------------------------------------------------------
     */

    const headers = [
      "Registration ID",
      "Team Name",
      "Problem Statement",

      "Leader Name",
      "Leader Roll No",
      "Leader Email",
      "Leader Phone",
      "Leader Gender",
      "Leader Department",
      "Leader Year",
      "Leader Section",

      "Member 1 Name",
      "Member 1 Roll",
      "Member 1 Email",

      "Member 2 Name",
      "Member 2 Roll",
      "Member 2 Email",

      "Member 3 Name",
      "Member 3 Roll",
      "Member 3 Email",

      "Member 4 Name",
      "Member 4 Roll",
      "Member 4 Email",

      "Member 5 Name",
      "Member 5 Roll",
      "Member 5 Email",

      "Amount",
      "Transaction ID",

      "Status",

      "Unlocked",

      "Version",

      "Created At",

      "Updated At",
    ];

    const headerRow = worksheet.addRow(headers);

    headerRow.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    headerRow.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "1F4E78",
      },
    };

    /**
     * --------------------------------------------------------
     * Data Rows
     * --------------------------------------------------------
     */

    registrations.forEach((registration) => {
      const members = [...registration.members];

      while (members.length < 5) {
        members.push({});
      }

      worksheet.addRow([
        registration.registrationId,

        registration.teamName,

        registration.problemStatement,

        registration.leader.name,
        registration.leader.rollNumber,
        registration.leader.email,
        registration.leader.phone,
        registration.leader.gender,
        registration.leader.department,
        registration.leader.year,
        registration.leader.section,

        members[0].name ?? "",
        members[0].rollNumber ?? "",
        members[0].email ?? "",

        members[1].name ?? "",
        members[1].rollNumber ?? "",
        members[1].email ?? "",

        members[2].name ?? "",
        members[2].rollNumber ?? "",
        members[2].email ?? "",

        members[3].name ?? "",
        members[3].rollNumber ?? "",
        members[3].email ?? "",

        members[4].name ?? "",
        members[4].rollNumber ?? "",
        members[4].email ?? "",

        registration.payment.amount,
        registration.payment.transactionId,

        registration.status,

        registration.isUnlocked ? "Yes" : "No",

        registration.registrationVersion,

        registration.createdAt,

        registration.updatedAt,
      ]);
    });

    /**
     * --------------------------------------------------------
     * Auto Filter
     * --------------------------------------------------------
     */

    worksheet.autoFilter = {
      from: {
        row: 4,
        column: 1,
      },
      to: {
        row: 4,
        column: headers.length,
      },
    };

    /**
     * --------------------------------------------------------
     * Auto Width
     * --------------------------------------------------------
     */

    worksheet.columns.forEach((column) => {
      let maxLength = 15;

      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, value.length + 2);
      });

      column.width = Math.min(maxLength, 40);
    });

    /**
     * --------------------------------------------------------
     * Date Format
     * --------------------------------------------------------
     */

    worksheet.getColumn(headers.length - 1).numFmt =
      "dd-mmm-yyyy hh:mm";

    worksheet.getColumn(headers.length).numFmt =
      "dd-mmm-yyyy hh:mm";

    return workbook;
  }
}

export default new RegistrationExport();