"use client"

import React from "react"

export default function TelemedicineConsentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800 flex items-center justify-center min-h-[80vh]">
      <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary text-center tracking-tight">Telemedicine Consent</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3 mt-6">Patient Consent</h2>
            <p className="mb-3 leading-relaxed">Only use our services if you agree with the following information.</p>
            <p className="mb-3 leading-relaxed">thepharmaexpress is a Telemedicine platform that contracts with healthcare providers to provide you with affordable treatment of erectile dysfunction. We are not a pharmacy or any other healthcare provider.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 mt-4">What is Telemedicine?</h2>
            <p className="mb-3 leading-relaxed">Telemedicine involves the use of electronic communications to enable health care providers at different locations to share individual patient medical information for the purpose of improving patient care. Providers may include primary care practitioners, specialists, and/or subspecialists. The information may be used for diagnosis, therapy, follow-up and/or education, and may include any of the following:</p>
            <ul className="list-disc pl-6 mb-3 leading-relaxed">
              <li>Patient medical records</li>
              <li>Medical images</li>
              <li>Live two-way audio and video</li>
              <li>Output data from medical devices and sound and video files</li>
            </ul>
            <p className="mb-3 leading-relaxed">Electronic systems used will incorporate network and software security protocols to protect the confidentiality of patient identification and imaging data and will include measures to safeguard the data and to ensure its integrity against intentional or unintentional corruption.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 mt-4">Expected Benefits</h2>
            <ul className="list-disc pl-6 mb-3 leading-relaxed">
              <li>Improved access to medical care by enabling a patient to remain in his/her doctor’s office (or at a remote site) while the physician obtains test results and consults from healthcare practitioners at distant/other sites.</li>
              <li>More efficient medical evaluation and management.</li>
              <li>Obtaining expertise of a distant specialist.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 mt-4">Possible Risks</h2>
            <ul className="list-disc pl-6 mb-3 leading-relaxed">
              <li>In rare cases, information transmitted may not be sufficient (e.g. poor resolution of images) to allow for appropriate medical decision making by the physician and consultant(s);</li>
              <li>Delays in medical evaluation and treatment could occur due to deficiencies or failures of the equipment;</li>
              <li>In very rare instances, security protocols could fail, causing a breach of privacy of personal medical information;</li>
              <li>In rare cases, a lack of access to complete medical records may result in adverse drug interactions or allergic reactions or other judgment errors;</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2 mt-4">By agreeing to this form, I understand the following:</h2>
            <ul className="list-disc pl-6 mb-3 leading-relaxed">
              <li>I understand that the laws that protect privacy and the confidentiality of medical information also apply to telemedicine, and that no information obtained in the use of telemedicine which identifies me will be disclosed to researchers or other entities without my consent.</li>
              <li>I understand that I have the right to withhold or withdraw my consent to the use of telemedicine in the course of my care at any time, without affecting my right to future care or treatment.</li>
              <li>I understand that I have the right to inspect all information obtained and recorded in the course of a telemedicine interaction, and may receive copies of this information for a reasonable fee.</li>
              <li>I understand that a variety of alternative methods of medical care may be available to me, and that I may choose one or more of these at any time. My doctor has explained the alternatives to my satisfaction.</li>
              <li>I understand that telemedicine may involve electronic communication of my personal medical information to other medical practitioners who may be located in other areas, including out of state.</li>
              <li>I understand that it is my duty to inform my doctor of electronic interactions regarding my care that I may have with other healthcare providers.</li>
              <li>I understand that I may expect the anticipated benefits from the use of telemedicine in my care, but that no results can be guaranteed or assured.</li>
              <li>I understand that ED is a risk marker for underlying cardiovascular disease and other health conditions that may warrant evaluation and treatment with my primary care provider.</li>
              <li>I understand that I must read and understood the Terms of Use and the Privacy Policy prior to using services of thepharmaexpress.</li>
              <li>I understand that by using thepharmaexpress, I accept the responsibility to provide full and truthful answers to all questions regarding my health. I understand that physicians working with thepharmaexpress are unable to independently verify the information provided and will make a professional judgment based on the information that I provide.</li>
              <li>I understand that I will not receive any medical services beyond treatment of erectile dysfunction.</li>
              <li>I understand that men with symptoms of erectile dysfunction should undergo a thorough medical, sexual and psychological history evaluation, a physical examination, and selective laboratory testing as prescribed by primary care providers. I understand that Telemedicine services could not encompass all medical services to properly diagnose the cause and treatment of erectile dysfunction.</li>
              <li>I understand that the prescribed medication may cause serious side effects, such as (but not limited to) a painful erection lasting more than 4 hours. I shall inform the prescribing physician of any allergies, use of recreational and prescription drugs.  I understand that if I have a condition where sex is not advised then I will not be using services of thepharmaexpress.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
