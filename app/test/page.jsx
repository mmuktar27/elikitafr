
//import PatientDetailsView from "../components/PatientDetailsView";
"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Camera,
  LightbulbOff,
  Brain,
  Menu,
  Sparkles,
  Lightbulb,
  Activity,
  MinusCircle,
  PlusCircle,
  Plus,
  Clock,
  Video,
  UserRound,
  Share2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  AlertTriangle,
  ArrowLeft,
  Beaker,
  Bed,
  Bell,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Calendar,
  CalendarCheck,
  CameraOff,
  Check,
  CheckCircle,
  ChevronDown,
  Clipboard,
  ClockIcon,
  Database,
  Edit,
  Edit2,
  Eye,
  FileBarChart,
  FileText,
  Filter,
  Home,
  Info,
  Layers,
  LogOut,
  Mail,
  MapPin,
  Mic,
  MicOff,
  Phone,
  Pill,
  QrCode,
  Search,
  Settings,
  Speaker,
  Stethoscope,
  TestTube,
  Thermometer,
  Trash2,
  User,
  UserCog,
  UserPlus,
  Users,
  X,
  Zap,
  Globe,
  Printer,
  VolumeIcon,
  Send,
  Copy,
} from "lucide-react";


const PatientDetailsView = ({ patient, onClose , setSelectedUser }) => {
    const [activeTab, setActiveTab] = useState("summary");
    const [showConsultationForm, setShowConsultationForm] = useState(false);
     const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
      const [isAddOpen, setIsAddOpen] = useState(false);
         const [isAddmOpen, setIsAddmOpen] = useState(false);
        const [isAddDOpen, setIsAddDOpen] = useState(false);
        const [isAddlabOpen, setIsAddlabOpen] = useState(false);
         const [result, setResult] = useState(null);
         const closeModal = () => setIsAddlabOpen(false);
         const viewlabDetails = (patient) => {
      setResult(patient.labResult);  // Replace with actual lab result details
      setIsAddlabOpen(true);
    };
     const [refmodalIsOpen, setrefModalIsOpen] = useState(false);
    const [selectedrefOption, setSelectedrefOption] = useState("");
    const [list, setList] = useState([]);
    const [selectedRef, setSelectedRef] = useState("");
  
    // Open modal handler
    const openrefModal = () => setrefModalIsOpen(true);
    const handleRefChange = (event) => {
      setSelectedRef(event.target.value);
    };
    // Close modal handler
    const closerefModal = () => {
      setrefModalIsOpen(false);
      setSelectedrefOption("");
      setSelectedRef("");
      setList([]);
    };
  
    // Handle option selection and update list based on selection
    const handleSelectrefChange = (event) => {
      const value = event.target.value;
      setSelectedrefOption(value);
  
      // Populate the list based on selection
      switch (value) {
        case "doctor":
          setList(doctors);
          break;
        case "labTech":
          setList(labTechnicians);
          break;
        case "pharmacy":
          setList(pharmacies);
          break;
        default:
          setList([]);
          break;
      }
    }
      const handleFormSubmit = async (actionType) => {
      setIsLoading(true);
     
      setIsLoading(false);
      setIsAddOpen(false); // Close dialog after submission
    };
     const handleDialogChange = (isOpen, actionType) => {
      if (actionType === 'add' && isOpen) {
        // Handle any logic when the dialog opens (e.g., reset form, etc.)
      }
      setIsAddOpen(isOpen);
    };
    const handleDialogDChange = (isOpen, actionType) => {
      if (actionType === 'add' && isOpen) {
        // Handle any logic when the dialog opens (e.g., reset form, etc.)
      }
      setIsAddDOpen(isOpen);
    };
     const handleDialogmChange = (isOpen, actionType) => {
      if (actionType === 'add' && isOpen) {
        // Handle any logic when the dialog opens (e.g., reset form, etc.)
      }
      setIsAddmOpen(isOpen);
    };
     const handleDialoglabChange= (isOpen, actionType) => {
      if (actionType === 'add' && isOpen) {
        // Handle any logic when the dialog opens (e.g., reset form, etc.)
      }
      setIsAddlabOpen(isOpen);
    }
   const LabResultDetailsModal = ({ result, isOpen, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-md shadow-lg max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <XIcon className="h-6 w-6" />
            </button>
  
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lab Result Details</h2>
  
            {/* Basic Test Information */}
            <div className="space-y-4 mt-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700">Basic Test Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Test Name</h4>
                    <p>{result.testName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Description</h4>
                    <p>{result.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">LOINC Code</h4>
                    <p>{result.code}</p>
                  </div>
                </div>
              </div>
  
              {/* Result Value and Reference Range */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700">Result and Reference Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Result Value</h4>
                    <p>{result.value} {result.unit}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Reference Range</h4>
                    <p>{result.referenceRange}</p>
                  </div>
                </div>
              </div>
  
              {/* Flags or Alerts */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700">Interpretive Comments</h3>
                <p>{result.flags}</p>
              </div>
  
              {/* Collection Details */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700">Collection Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Collection Method</h4>
                    <p>{result.collectionMethod}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Specimen Type</h4>
                    <p>{result.specimenType}</p>
                  </div>
                </div>
              </div>
  
              {/* Timing and Ordering Information */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700">Timing and Ordering</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium">Performed Date</h4>
                    <p>{result.performedDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Ordered By</h4>
                    <p>{result.orderedBy}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Performing Lab</h4>
                    <p>{result.performingLab}</p>
                  </div>
                </div>
              </div>
  
              {/* Patient Details */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700">Patient Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium">Name</h4>
                    <p>{result.patientName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">DOB</h4>
                    <p>{result.patientDOB}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">MRN</h4>
                    <p>{result.patientMRN}</p>
                  </div>
                </div>
              </div>
  
              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Status</h4>
                    <p>{result.status}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Comments</h4>
                    <p>{result.comments}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

}


const Referrals = () => {
  const [referralData, setReferralData] = useState([
    {
      id: "12345",
      requester: { display: "Dr. John Smith" },
      authoredOn: "2023-04-15",
      status: "Open",
      patient: {
        name: "Jane Doe",
        dob: "1985-06-20",
        condition: "Diabetes",
        progress: "75%",
        phone: "555-1234",
        email: "jane.doe@example.com",
      },
      details: "Referred for routine check-up and medication management",
    },
    {
      id: "67890",
      requester: { display: "Dr. Sarah Lee" },
      authoredOn: "2023-06-01",
      status: "Closed",
      patient: {
        name: "Michael Johnson",
        dob: "1992-09-12",
        condition: "Hypertension",
        progress: "90%",
        phone: "555-5678",
        email: "michael.johnson@example.com",
      },
      details:
        "Referred for follow-up after hospitalization for high blood pressure",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activepage, setIsactivepage] = useState("referral");
  const [showDetails, setShowDetails] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      identifier: "PT001",
      name: "Alice Brown",
      birthDate: "1988-05-15",
      gender: "female",
      address: "123 Main St",
      phone: "(555) 123-4567",
      email: "alice@email.com",
      condition: "Hypertension",
      status: "active",
      progress: "Stable",
      language: "English",
      maritalStatus: "Married",
      emergencyContact: "John Brown",
      insuranceProvider: "HealthCare Plus",
      vitals: {
        bloodPressure: "120/80",
        heartRate: 72,
        temperature: 98.6,
      },
      consultations: [
        {
          id: "1",
          date: "2024-01-01",
          doctor: "Dr. Smith",
          reason: "Regular checkup",
          status: "completed",
        },
      ],
      diagnoses: [
        {
          id: "1",
          date: "2024-01-01",
          condition: "Hypertension",
          status: "Stable",
          doctor: "Dr. Smith",
        },
      ],
      medications: [
        {
          id: "1",
          name: "Amlodipine",
          dosage: "5 mg",
          frequency: "once daily",
          startDate: "2024-01-01",
          endDate: "2024-01-11",
        },
      ],
      labResults: [
        {
          id: 1,
          testName: "Glucose",
          description: "Measures the glucose level in the blood",
          code: "15074-8",
          value: 120,
          unit: "mg/dL",
          referenceRange: "70-99 mg/dL",
          flags: "High",
          collectionMethod: "Venipuncture",
          specimenType: "Blood",
          performedDate: "2023-04-15",
          orderedBy: "Dr. Jane Smith",
          performingLab: "deichi clinic gembu",
          patientName: "John Doe",
          patientDOB: "1990-05-12",
          patientMRN: "123456",
          status: "Completed",
          comments:
            "Patient is advised to monitor blood glucose levels closely.",
        },
      ],
    },
  ]);
  const filteredReferrals = referralData.filter((referral) => {
    const searchFields = [
      referral.id,
      referral.requester.display,
      referral.authoredOn,
      referral.status,
      referral.patient.name,
      referral.patient.condition,
    ];
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  const handleClose = () => {
    setShowDetails(false);
    setSelectedPatient(null);
  };
  const handleViewReferralDetails = (referral) => {
    setSelectedReferral(referral);
    setIsReferralModalOpen(true);
  };

  const handleCloseReferralModal = () => {
    setSelectedReferral(null);
    setIsReferralModalOpen(false);
  };

  const handleViewMoreInfo = (patient) => {
    setSelectedPatient(patient);
    setIsReferralModalOpen(false);
    setIsactivepage("patientdetails");
  };

  return (
    <div>
      {activepage === "referral" && (
        <div className="bg-[#75C05B]/10 p-4 rounded-md shadow-md">
          <div className="flex justify-between items-center w-full">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                placeholder="Search referrals..."
                className="pl-8 bg-white rounded-md p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="bg-[#007664] text-white p-2 text-left">Referral ID</th>
                  <th className="bg-[#007664] text-white p-2 text-left">Referral Source</th>
                  <th className="bg-[#007664] text-white p-2 text-left">Referral Date</th>
                  <th className="bg-[#007664] text-white p-2 text-left">Referral Status</th>
                  <th className="bg-[#007664] text-white p-2 text-left">Patient</th>
                  <th className="bg-[#007664] text-white p-2 text-left">Condition</th>
                  <th className="bg-[#007664] text-white p-2 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.map((referral) => (
                  <tr
                    key={referral.id}
                    className="hover:bg-green-50 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleViewReferralDetails(referral)}
                  >
                    <td className="p-2">{referral.id}</td>
                    <td className="p-2">{referral.requester.display}</td>
                    <td className="p-2">{referral.authoredOn}</td>
                    <td className="p-2">{referral.status}</td>
                    <td className="p-2">{referral.patient.name}</td>
                    <td className="p-2">{referral.patient.condition}</td>
                    <td className="p-2">{referral.patient.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dialog (Modal) */}
          {isReferralModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={handleCloseReferralModal}
            >
              <div
                className="bg-white p-6 rounded-md shadow-lg max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium" style={{ color: "#007664" }}>
                    Referral Details
                  </h2>
                </div>

                {selectedReferral && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Info size={24} color="#007664" />
                        <div>
                          <h3 className="text-lg font-medium text-black">Referral ID</h3>
                          <p className="text-[#007664]">{selectedReferral.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User size={24} color="#007664" />
                        <div>
                          <h3 className="text-lg font-medium text-black">Referral Source</h3>
                          <p className="text-[#007664]">
                            {selectedReferral.requester.display}
                          </p>
                        </div>
                      </div>
                      {/* Other patient details */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Patient Details View */}
      {activepage === "patientdetails" && (
        <PatientDetailsView onClose={handleClose} patient={selectedPatient} />
      )}
    </div>
  );
};

export default Referrals;
