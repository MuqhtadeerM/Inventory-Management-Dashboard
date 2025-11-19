const StatCard = ({ title, value, iconBg }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="mb-1 text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`${iconBg} p-3 rounded-lg w-14 h-14`}></div>
    </div>
  </div>
);

export default StatCard;
