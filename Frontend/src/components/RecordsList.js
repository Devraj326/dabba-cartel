import React from 'react';
import RecordItem from './RecordItem';

const RecordsList = ({ records, loading, onUpdateRecord, onDeleteRecord, users }) => {
  if (loading) {
    return (
      <div className="records-container">
        <h2>Records</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="records-container">
      <h2>Records ({records.length})</h2>
      <div className="records-list">
        {records.length === 0 ? (
          <div className="empty-state">
            <p>📝 No records found. Add your first entry!</p>
          </div>
        ) : (
          records.map(record => (
            <RecordItem
              key={record._id}
              record={record}
              onUpdate={onUpdateRecord}
              onDelete={onDeleteRecord}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecordsList;
