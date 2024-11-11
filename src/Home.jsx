import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [pacientes, setPacientes] = useState([]); 
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [cid, setCid] = useState('');
  const [birthday, setBirthday] = useState('');
  const [guardian, setGuardian] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); 

  const navigate = useNavigate(); 

  
  const fetchPacientes = async () => {
    const { data, error } = await supabase.from('Pacientes').select();
    if (error) {
      setError('Error fetching pacientes');
      console.error(error);
    } else {
      setPacientes(data);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !age || !cid || !birthday || !guardian || !report) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      
      const { error: insertError } = await supabase
        .from('Pacientes')
        .insert([
          { name, age, cid, birthday, guardian, report },
        ]);

      if (insertError) throw insertError;

      
      await fetchPacientes();

      
      setName('');
      setAge('');
      setCid('');
      setBirthday('');
      setGuardian('');
      setReport('');
      setShowForm(false); 
      alert('Paciente added successfully!');
    } catch (err) {
      console.error('Error inserting paciente:', err);
      setError('Error adding paciente');
    } finally {
      setLoading(false);
    }
  };

  
  const handleSignOut = async () => {
    await supabase.auth.signOut(); 
    navigate('/'); 
  };

  return (
    <div>
      <h1>Pacientes</h1>

      
      <button onClick={handleSignOut}>Sign Out</button>

      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Paciente'}
      </button>

      
      {showForm && (
        <div>
          <h2>Add New Paciente</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              CID:
              <input
                type="text"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Birthday:
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Guardian:
              <input
                type="text"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Report:
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Paciente'}
            </button>
          </form>
        </div>
      )}

      <h2>All Pacientes</h2>

      
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>CID</th>
            <th>Birthday</th>
            <th>Guardian</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.name}</td>
                <td>{paciente.age}</td>
                <td>{paciente.cid}</td>
                <td>{paciente.birthday}</td>
                <td>{paciente.guardian}</td>
                <td>{paciente.report}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No pacientes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
