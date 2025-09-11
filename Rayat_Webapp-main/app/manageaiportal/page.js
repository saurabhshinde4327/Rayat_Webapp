"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import * as XLSX from "xlsx";  // 👈 import
import { saveAs } from "file-saver";

export default function AiInfoPage() {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({});
  const [regions, setRegions] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch("/api/regions");
        const data = await res.json();
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    if (formType) {
      fetchTableData(formType);
    }
  }, [formType]);

  const fetchTableData = async (type) => {
    try {
      const res = await fetch(`/api/ai-info?formType=${type}`);
      const data = await res.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

const exportToExcel = () => {
  if (!tableData || tableData.length === 0) {
    alert("❌ डेटा उपलब्ध नाही");
    return;
  }

  // FormType नुसार शीर्षक तयार करणे
  let title = "";
  if (formType === "5_10") {
    title = "इ.५ वी ते इ.१० वी AI कोर्स (कृत्रिम बुद्धिमत्ता) कोर्स माहिती";
  } else if (formType === "11_12") {
    title = "इ.११ वी व १२ वी AI कोर्स (कृत्रिम बुद्धिमत्ता) कोर्स माहिती";
  } else if (formType === "senior") {
    title = "वरिष्ठ महाविद्यालय AI कोर्स (कृत्रिम बुद्धिमत्ता) कोर्स माहिती";
  }

  // Data formatting
  const formattedData = tableData.map((row) => ({
    "विभाग": row.vibhag_id,
    "शाखेचे नाव": row.shakheche_nav,
    "शाखेचा प्रकार": row.shakhecha_prakar,
    "शाखा": row.shakha,
    "शाखेचे स्वरूप": row.shakheche_svarup,
    "इयत्ता": row.iyatta,
    "एकूण प्रवेशित विद्यार्थी": row.ekun_praveshit_vidyarthi,
    "AI विद्यार्थी नावे": row.ai_vidyarthi_nav
      ? row.ai_vidyarthi_nav.split(",").map(n => n.trim()).join("\n")
      : "",
    "विद्यार्थ्याचा वर्ग": row.vidyarthyacha_varg
      ? row.vidyarthyacha_varg.split(",").map(v => v.trim()).join("\n")
      : "",
    "AI एकूण विद्यार्थी": row.ai_ekun_vidyarthi,
    "AI बॅच संख्या": row.ai_batch_sankhya,
    "एकूण प्रवेश": formType === "11_12"
      ? row.ekun_pravesh_11_12
      : formType === "5_10"
      ? row.ekun_pravesh_5_10
      : row.ekun_pravesh_senior,
    "AI एकूण प्रवेश": formType === "11_12"
      ? row.ekun_ai_pravesh_11_12
      : formType === "5_10"
      ? row.ekun_ai_pravesh_5_10
      : row.ekun_ai_pravesh_senior,
    "AI बॅच संख्या": formType === "11_12"
      ? row.ai_batch_sankhya_11_12
      : formType === "5_10"
      ? row.ai_batch_sankhya_5_10
      : row.ai_batch_sankhya_senior,
  }));

  // Excel sheet तयार करणे
  const ws = XLSX.utils.json_to_sheet(formattedData, { origin: 1 }); // data 2nd row पासून
  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" }); // title first row मध्ये

  // wrap text सेट करणे
  const range = XLSX.utils.decode_range(ws['!ref']);
  for(let R = 1; R <= range.e.r; ++R) { // row 2 पासून wrap text
    const C = Object.keys(formattedData[0]).indexOf("AI विद्यार्थी नावे");
    const cellAddress = XLSX.utils.encode_cell({r:R, c:C});
    if(!ws[cellAddress]) continue;
    ws[cellAddress].s = { alignment: { wrapText: true } };
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "AI Info");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "ai-info.xlsx");
};





  const tabs = [
    { id: "5_10", label: "५ वी ते १० वी" },
    { id: "11_12", label: "११ वी व १२ वी" },
    { id: "senior", label: "वरिष्ठ महाविद्यालय" },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <Topbar />

          <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-teal-900">
              AI माहिती फॉर्म
            </h2>

            {/* Tabs */}
            <div className="flex justify-center space-x-3 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormType(tab.id)}
                  className={`px-6 py-2 rounded-full font-medium shadow-md transition ${
                    formType === tab.id
                      ? "bg-teal-900 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Export बटण */}
            {formType && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={exportToExcel}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  📤 Export to Excel
                </button>
              </div>
            )}

            {/* Data Table */}
            {formType && (
              <div className="mt-4 bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <h3 className="text-xl font-semibold mb-4">Saved Records</h3>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-3 py-2">ID</th>
                      <th className="border px-3 py-2">विभाग</th>
                      <th className="border px-3 py-2">शाखेचे नाव</th>
                      <th className="border px-3 py-2">शाखेचा प्रकार</th>
                      <th className="border px-3 py-2">शाखा</th>
                      <th className="border px-3 py-2">शाखेचे स्वरूप</th>
                      <th className="border px-3 py-2">इयत्ता</th>
                      <th className="border px-3 py-2">एकूण प्रवेशित विद्यार्थी</th>
                      <th className="border px-3 py-2">AI विद्यार्थी नावे</th>
                      <th className="border px-3 py-2">विद्यार्थ्याचा वर्ग</th>
                      <th className="border px-3 py-2">AI एकूण विद्यार्थी</th>
                      <th className="border px-3 py-2">AI बॅच संख्या</th>
                      <th className="border px-3 py-2">
                        {formType === "11_12"
                          ? "एकूण प्रवेश (११/१२)"
                          : formType === "5_10"
                          ? "एकूण प्रवेश ५वी ते १० वी"
                          : "एकूण प्रवेश वरिष्ठ महाविद्यालय"}
                      </th>
                      <th className="border px-3 py-2">
                        {formType === "11_12"
                          ? "एकूण AI प्रवेश (११/१२)"
                          : formType === "5_10"
                          ? "एकूण AI प्रवेश ५वी ते १०वी"
                          : "एकूण AI प्रवेश  वरिष्ठ महाविद्यालय"}
                      </th>
                      <th className="border px-3 py-2">
                        {formType === "11_12"
                          ? "AI बॅच संख्या (११/१२)"
                          : formType === "5_10"
                          ? "एकूण AI  बॅचची  संख्या  ५वी ते १०वी"
                          : "एकूण AI  बॅचची  संख्या  वरिष्ठ महाविद्यालय"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(tableData) && tableData.length > 0 ? (
                      tableData.map((row) => (
                        <tr key={row.id}>
                          <td className="border px-3 py-2">{row.id}</td>
                          <td className="border px-3 py-2">{row.vibhag_id}</td>
                          <td className="border px-3 py-2">{row.shakheche_nav}</td>
                          <td className="border px-3 py-2">{row.shakhecha_prakar}</td>
                          <td className="border px-3 py-2">{row.shakha}</td>
                          <td className="border px-3 py-2">{row.shakheche_svarup}</td>
                          <td className="border px-3 py-2">{row.iyatta}</td>
                          <td className="border px-3 py-2">{row.ekun_praveshit_vidyarthi}</td>
                         <td className="border px-3 py-2 whitespace-pre-line">
  {row.ai_vidyarthi_nav
    ? row.ai_vidyarthi_nav.split(",").map((name, idx) => (
        <span key={idx}>{name.trim()}<br/></span>
      ))
    : ""}
</td>

                         <td className="border px-3 py-2 whitespace-pre-line">
  {row.vidyarthyacha_varg
    ? row.vidyarthyacha_varg.split(",").map((v, idx) => (
        <span key={idx}>{v.trim()}<br/></span>
      ))
    : ""}
</td>

                          <td className="border px-3 py-2">{row.ai_ekun_vidyarthi}</td>
                          <td className="border px-3 py-2">{row.ai_batch_sankhya}</td>
                          <td className="border px-3 py-2">{row.ekun_pravesh_11_12}</td>
                          <td className="border px-3 py-2">{row.ekun_ai_pravesh_11_12}</td>
                          <td className="border px-3 py-2">{row.ai_batch_sankhya_11_12}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="15" className="text-center py-3 text-gray-500">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
