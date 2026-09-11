import React, { useState } from 'react';
import { CustomerInquiry } from '../types';
import { INITIAL_INQUIRIES } from '../data/mockData';
import { MessageSquare, Send, CheckCircle2, AlertCircle, FileText, Headphones, Clock } from 'lucide-react';

interface CustomerInquiryFormProps {
  onSelectOrderForTracking: (orderId: string) => void;
}

export const CustomerInquiryForm: React.FC<CustomerInquiryFormProps> = ({
  onSelectOrderForTracking
}) => {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);
  const [orderId, setOrderId] = useState('GF-88492');
  const [customerName, setCustomerName] = useState('Marcus Lim');
  const [email, setEmail] = useState('marcus.lim@example.com');
  const [phone, setPhone] = useState('+65 9123 4567');
  const [topic, setTopic] = useState<CustomerInquiry['topic']>('delivery_delay');
  const [message, setMessage] = useState('');
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const ticketId = `INQ-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newInquiry: CustomerInquiry = {
      id: ticketId,
      orderId: orderId.trim().toUpperCase(),
      customerName,
      email,
      phone,
      topic,
      message,
      status: 'Received',
      timestamp: timeStr
    };

    setInquiries([newInquiry, ...inquiries]);
    setSuccessTicket(ticketId);
    setMessage('');

    setTimeout(() => {
      setSuccessTicket(null);
    }, 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Title */}
      <div className="border-b border-neutral-200 pb-5">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md mb-2">
          <Headphones className="w-3.5 h-3.5 text-emerald-600" />
          <span>GrabCare Concierge & Content Form</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
          Customer Delivery Inquiries & Order Feedback
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Need to modify dropoff directions, report order issues, or submit feedback? Our 24/7 automated logistics desk assists immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900">
              Submit Order Assistance Request
            </h3>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Average Response: &lt; 2 mins
            </span>
          </div>

          {successTicket && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold block">Inquiry Ticket #{successTicket} Logged!</span>
                <p className="mt-0.5 text-emerald-800">
                  Our dispatch team and rider have received your note for Order #{orderId}. Status updates will be sent via SMS & push notification.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Order Tracking Code
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. GF-88492"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 font-mono uppercase focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Full Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Inquiry Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as CustomerInquiry['topic'])}
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden bg-white text-neutral-800"
              >
                <option value="delivery_delay">Delivery Status Query / Delay</option>
                <option value="modify_address">Update Doorstep Dropoff Instructions</option>
                <option value="missing_item">Item Verification / Missing Condiment</option>
                <option value="dietary_instruction">Special Dietary Request for Kitchen</option>
                <option value="rider_feedback">Delivery Courier Compliment / Feedback</option>
                <option value="other">Other Logistics Inquiry</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Message & Content Details
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your request in detail (e.g., 'Please ensure courier buzzes intercom #1402 rather than leaving at the lobby gate')..."
                className="w-full p-3 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden text-neutral-800"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request to Dispatch Desk</span>
            </button>
          </form>
        </div>

        {/* Right Info & Recent Tickets (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick SLA Card */}
          <div className="bg-emerald-900 text-white rounded-3xl p-6 space-y-3">
            <h4 className="text-base font-black">GrabFood Customer Guarantee</h4>
            <p className="text-xs text-neutral-200 leading-relaxed">
              Every hot meal is sealed with a tamper-evident strip. Our real-time dispatch desk monitors active couriers 24/7 to resolve delays dynamically.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-300 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Guaranteed 100% on-time resolution</span>
            </div>
          </div>

          {/* Recent Inquiries List */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Recent Inquiries & Tickets ({inquiries.length})
              </h4>
            </div>

            <div className="space-y-3 divide-y divide-neutral-100 text-xs">
              {inquiries.map((inq) => (
                <div key={inq.id} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 font-mono">
                      #{inq.id} · {inq.orderId}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inq.status === 'Resolved'
                          ? 'bg-neutral-100 text-neutral-700'
                          : inq.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2">
                    "{inq.message}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span>From {inq.customerName}</span>
                    <button
                      onClick={() => onSelectOrderForTracking(inq.orderId)}
                      className="text-emerald-600 hover:text-emerald-700 font-bold underline cursor-pointer"
                    >
                      Track Order {inq.orderId} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
