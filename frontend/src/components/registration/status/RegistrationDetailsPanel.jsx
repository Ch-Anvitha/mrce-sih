import React from 'react';
import { User, Users, GraduationCap, MapPin, Briefcase, Mail, Phone, Calendar, Receipt, FileText } from 'lucide-react';
import { format } from 'date-fns';

export const RegistrationDetailsPanel = ({ registration }) => {
  const { teamName, problemStatement, leader, members, payment, createdAt } = registration;

  return (
    <div className="space-y-8">
      {/* Team Details Section */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" /> Team Details
        </h3>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Team Name</p>
            <p className="font-semibold text-slate-900">{teamName}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Registration Date</p>
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {format(new Date(createdAt), 'MMM dd, yyyy - hh:mm a')}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Problem Statement</p>
            <p className="font-semibold text-slate-900 bg-white p-3 border border-slate-200 rounded-lg">
              {problemStatement}
            </p>
          </div>
        </div>
      </section>

      {/* Leader Details Section */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" /> Team Leader
        </h3>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="grid gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</p>
              <p className="font-medium text-slate-900">{leader.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Roll Number</p>
              <p className="font-medium text-slate-900 font-mono">{leader.rollNumber}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</p>
              <p className="font-medium text-slate-900 capitalize">{leader.gender.toLowerCase()}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</p>
              <p className="font-medium text-slate-900 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {leader.email}</p>
              <p className="font-medium text-slate-900 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {leader.phone}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Details</p>
              <p className="font-medium text-slate-900 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {leader.department}</p>
              <p className="font-medium text-slate-900 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Year {leader.year} - Section {leader.section}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Team Members ({members.length})
        </h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-bold">Name / Contact</th>
                  <th className="px-4 py-3 font-bold">Roll No. / Academic</th>
                  <th className="px-4 py-3 font-bold">Gender</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{member.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{member.email}</p>
                      <p className="text-slate-500 text-xs">{member.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 font-mono">{member.rollNumber}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{member.department} - Year {member.year} '{member.section}'</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700">
                      {member.gender.toLowerCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payment Details Section */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" /> Payment Information
        </h3>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Transaction ID</p>
            <p className="font-mono font-bold text-slate-900">{payment.transactionId}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount Paid</p>
            <p className="font-semibold text-emerald-600">₹{payment.amount}</p>
          </div>
          
          {payment.remarks && (
            <div className="sm:col-span-2 mt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Admin Remarks</p>
              <div className="bg-white border border-amber-200 text-amber-900 p-3 rounded-lg flex items-start gap-2 text-sm">
                <FileText className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                <p>{payment.remarks}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
