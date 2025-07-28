const NoProduct = ({ lan }) => {
  return (
    <div className="p-4 rounded-md border mb-8 border-gray-600/30">
      <h2 className="text-2xl font-bold text-primary">{lan?.noResult}</h2>
      <p className="text-slate-600">{lan?.noResultExplain}</p>
    </div>
  );
};

export default NoProduct;
