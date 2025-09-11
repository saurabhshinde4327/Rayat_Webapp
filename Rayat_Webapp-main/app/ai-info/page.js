"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Swal from "sweetalert2";

export default function AiInfoPage() {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({});
  const [regions, setRegions] = useState([]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/ai-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, formData }),
      });
      if (res.ok) {
        await Swal.fire({ icon: "success", title: "डेटा सेव्ह झाला", confirmButtonText: "ठीक" });
        e.target.reset();
        setFormData({});
      } else {
        await Swal.fire({ icon: "error", title: "सेव्ह करण्यात अडचण आली", confirmButtonText: "पुन्हा प्रयत्न करा" });
      }
    } catch (error) {
      await Swal.fire({ icon: "error", title: "नेटवर्क त्रुटी", text: "कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.", confirmButtonText: "ठीक" });
    }
  };

  const tabs = [
    { id: "5_10", label: "५ वी ते १० वी" },
    { id: "11_12", label: "११ वी व १२ वी" },
    { id: "senior", label: "वरिष्ठ महाविद्यालय" },
  ];

  return (
    <>
      <HeaderSection />
      <Header />
      <Navbar />

      <div className="container mx-auto p-6">
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

        {/* Form */}
        {formType && (
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-6 border p-8 rounded-2xl shadow-lg bg-white"
          >
            {/* विभाग */}
            <div>
              <label className="block mb-1 font-medium">विभाग</label>
              <select
                name="vibhag_id"
                className="border p-2 w-full rounded"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  विभाग निवडा
                </option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* शाखेची माहिती */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block mb-1 font-medium">शाखेचे नाव</label>
    <input
      name="shakheche_nav"
      className="border p-2 w-full rounded"
      onChange={handleChange}
      placeholder="शाखेचे नाव टाका"
    />
  </div>

  {/* शाखेचा प्रकार */}
  <div>
    <label className="block mb-1 font-medium">शाखेचा प्रकार</label>
    <select
      name="shakhecha_prakar"
      className="border p-2 w-full rounded"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        प्रकार निवडा
      </option>
      {formType === "5_10" && (
        <option value="NA">माध्यमिक विद्यालय </option>
      )}
      {formType === "11_12" && (
        <>
          <option value="उच्च माध्यमिक (विद्यालयास सलग्न)">
            उच्च माध्यमिक (विद्यालयास सलग्न)
          </option>
          <option value="कनिष्ठ महाविद्यालय (महाविद्यालयास सलग्न)">
            कनिष्ठ महाविद्यालय (महाविद्यालयास सलग्न)
          </option>
        </>
      )}
      {formType === "senior" && (
        <option value="वरिष्ठ महाविद्यालय">वरिष्ठ महाविद्यालय</option>
      )}
    </select>
  </div>

  {/* शाखा */}
  <div>
    <label className="block mb-1 font-medium">शाखा</label>
    <select
      name="shakha"
      className="border p-2 w-full rounded"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        शाखा निवडा
      </option>
      {formType === "5_10" && <option value="NA">NA</option>}
      {formType === "11_12" && (
        <>
          <option value="कला">कला</option>
          <option value="वाणिज्य">वाणिज्य</option>
          <option value="विज्ञान">विज्ञान</option>
          <option value="संयुक्त">संयुक्त</option>
        </>
      )}
      {formType === "senior" && (
        <>
          <option value="कला">कला</option>
          <option value="वाणिज्य">वाणिज्य</option>
          <option value="विज्ञान">विज्ञान</option>
        </>
      )}
    </select>
  </div>

  {/* शाखेचे स्वरूप */}
  <div>
    <label className="block mb-1 font-medium">शाखेचे स्वरूप</label>
    <select
      name="shakheche_svarup"
      className="border p-2 w-full rounded"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        स्वरूप निवडा
      </option>
      {formType === "5_10" && <option value="NA">NA</option>}
      {formType === "11_12" && (
        <>
          <option value="अनुदानित">अनुदानित</option>
          <option value="विनाअनुदानित">विनाअनुदानित</option>
          <option value="स्वयंअर्थसहाय्यित">स्वयंअर्थसहाय्यित</option>
        </>
      )}
      {formType === "senior" && (
        <>
          <option value="अनुदानित">अनुदानित</option>
          <option value="विनाअनुदानित">विनाअनुदानित</option>
          <option value="यु.जी.">यु.जी.</option>
          <option value="पी.जी.">पी.जी.</option>
        </>
      )}
    </select>
  </div>
</div>


            {/* विद्यार्थी माहिती */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">इयत्ता</label>
                <input
                  name="iyatta"
                  className="border p-2 w-full rounded"
                  onChange={handleChange}
                  placeholder="उदा. ८ वी / १२ वी"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  एकूण प्रवेशित विद्यार्थी संख्या
                </label>
                <input
                  type="number"
                  name="ekun_praveshit_vidyarthi"
                  className="border p-2 w-full rounded"
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  AI साठी प्रवेशित विद्यार्थ्यांची नावे
                </label>
                <textarea
                  name="ai_vidyarthi_nav"
                  placeholder="विद्यार्थ्यांची नावे कॉमा (,) किंवा Enter ने वेगळी करा"
                  className="border p-2 w-full rounded h-28"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">विद्यार्थ्याचा वर्ग</label>
                <input
                  name="vidyarthyacha_varg"
                  className="border p-2 w-full rounded"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  AI एकूण विद्यार्थी संख्या
                </label>
                <input
                  type="number"
                  name="ai_ekun_vidyarthi"
                  className="border p-2 w-full rounded"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">AI बॅच संख्या</label>
                <input
                  type="number"
                  name="ai_batch_sankhya"
                  className="border p-2 w-full rounded"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Category specific fields with dynamic labels but same column keys */}
            {formType && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    {formType === "11_12"
                      ? "एकूण प्रवेश (११/१२ वी)"
                      : formType === "5_10"
                      ? "एकूण प्रवेश ५वी ते १० वी"
                      : "एकूण प्रवेश वरिष्ठ महाविद्यालय"}
                  </label>
                  <input
                    type="number"
                    name="ekun_pravesh_11_12"
                    className="border p-2 w-full rounded"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    {formType === "11_12"
                      ? "एकूण AI प्रवेश (११/१२ वी)"
                      : formType === "5_10"
                      ? "एकूण AI प्रवेश ५वी ते १०वी"
                      : "एकूण AI प्रवेश  वरिष्ठ महाविद्यालय"}
                  </label>
                  <input
                    type="number"
                    name="ekun_ai_pravesh_11_12"
                    className="border p-2 w-full rounded"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    {formType === "11_12"
                      ? "AI बॅच संख्या (११/१२ वी)"
                      : formType === "5_10"
                      ? "एकूण AI  बॅचची  संख्या  ५वी ते १०वी"
                      : "एकूण AI  बॅचची  संख्या  वरिष्ठ महाविद्यालय"}
                  </label>
                  <input
                    type="number"
                    name="ai_batch_sankhya_11_12"
                    className="border p-2 w-full rounded"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="bg-teal-900 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-800 transition"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </>
  );
}
