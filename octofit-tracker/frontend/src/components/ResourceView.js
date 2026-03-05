import { useEffect, useMemo, useState } from 'react';

function ResourceView({ title, resourcePath, resourceLabel }) {
  const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  const endpoint = `${apiBaseUrl}/${resourcePath}/`;

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError('');

    try {
      console.log(`[${resourceLabel}] REST API endpoint:`, endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      console.log(`[${resourceLabel}] Fetched data:`, payload);

      const normalized = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : [];

      setRecords(normalized);
    } catch (fetchError) {
      setError(fetchError.message);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [endpoint]);

  const filteredRecords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return records;
    }

    return records.filter((record) => JSON.stringify(record).toLowerCase().includes(query));
  }, [records, searchQuery]);

  const onSubmitFilter = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  const clearFilter = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  const getRecordName = (record) => (
    record.name
    || record.username
    || record.email
    || record.title
    || record.team_name
    || record.workout_type
    || record.activity_type
    || 'N/A'
  );

  const getRecordId = (record, index) => record.id || record._id || `row-${index + 1}`;

  return (
    <section>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h1 className="h2 text-primary-emphasis mb-0">{title}</h1>
            <a
              href={endpoint}
              target="_blank"
              rel="noreferrer"
              className="btn btn-link link-primary p-0"
            >
              Open API Endpoint
            </a>
          </div>

          <form className="row g-2 align-items-end mb-3" onSubmit={onSubmitFilter}>
            <div className="col-md-7">
              <label htmlFor={`${resourcePath}-filter`} className="form-label fw-semibold">
                Search {title}
              </label>
              <input
                id={`${resourcePath}-filter`}
                type="text"
                className="form-control"
                value={searchInput}
                placeholder={`Filter ${title.toLowerCase()} by any field`}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
            <div className="col-md-5 d-flex gap-2">
              <button type="submit" className="btn btn-primary">Apply Filter</button>
              <button type="button" className="btn btn-outline-secondary" onClick={clearFilter}>Clear</button>
              <button type="button" className="btn btn-outline-success" onClick={fetchRecords}>Refresh</button>
            </div>
          </form>

          {loading && <div className="alert alert-info mb-3">Loading {title.toLowerCase()}...</div>}
          {error && <div className="alert alert-danger mb-3">Error: {error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '70px' }}>#</th>
                    <th scope="col" style={{ width: '190px' }}>ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Summary</th>
                    <th scope="col" style={{ width: '140px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No {title.toLowerCase()} found.</td>
                    </tr>
                  )}

                  {filteredRecords.map((record, index) => (
                    <tr key={getRecordId(record, index)}>
                      <td>{index + 1}</td>
                      <td className="text-break">{String(getRecordId(record, index))}</td>
                      <td>{getRecordName(record)}</td>
                      <td className="text-break">{JSON.stringify(record).slice(0, 120)}...</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedRecord(record)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedRecord && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title h5 mb-0">{title} Details</h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedRecord(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="resource-json-pre">{JSON.stringify(selectedRecord, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedRecord(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </section>
  );
}

export default ResourceView;