import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [pacientes, setPacientes] = useState([]); 
  const [name, setName] = useState(''); 
  const [age, setAge] = useState('');
  const [doc, setDoc] = useState('');
  const [gender, setGender] = useState('');
  const [cid, setCid] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [guardian, setGuardian] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const [editingPaciente, setEditingPaciente] = useState(null); 
  const navigate = useNavigate(); 

  
  const fetchPacientes = async () => {
    // TODO: Obter pacientes restritos ao usuario logado
    // TODO: https://stackoverflow.com/a/75133001
    const { data, error } = await supabase
    .from('patients')
    .select();

    

    if (error) {
      setError('Erro ao tentar buscar pacientes');
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
     
    if (!name || !age || !doc || !cid || !birthday || !city || !uf || !guardian || !report) {
      setError('Todos os campos são necessários');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('patients')
        .insert([{ name, age, doc, gender, cid, birthday, city, uf, guardian, report }]);

      if (insertError) throw insertError;

      await fetchPacientes();
      setName('');
      setAge('');
      setDoc('');
      setGender('');
      setCid('');
      setBirthday('');
      setCity('');
      setUf('');
      setGuardian('');
      setReport('');
      setShowForm(false); 
      alert('Paciente adicionado com sucesso!');
    } catch (err) {
      console.error('Erro ao inserir paciente:', err);
      setError('Erro ao adicionar paciente');
    } finally {
      setLoading(false);
    }
  };

  
  const handleSignOut = async () => {
    await supabase.auth.signOut(); 
    navigate('/'); 
  };

  
  const handleEdit = (paciente) => {
    setEditingPaciente(paciente);
    setName(paciente.name);
    setAge(paciente.age);
    setDoc(paciente.doc);
    setGender(paciente.gender);
    setCid(paciente.cid);
    setBirthday(paciente.birthday);
    setCity(paciente.city);
    setUf(paciente.uf);
    setGuardian(paciente.guardian);
    setReport(paciente.report);
    setShowForm(true); 
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !age || !doc || !cid || !birthday || !city || !uf || !guardian || !report) {
      setError('Todos os campos são necessários');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('patients')
        .update({ name, age, doc, gender, cid, birthday, city, uf, guardian, report })
        .eq('id', editingPaciente.id);

      if (updateError) throw updateError;

      await fetchPacientes();

      setEditingPaciente(null);
      setName('');
      setAge('');
      setDoc('');
      setGender('');
      setCid('');
      setBirthday('');
      setCity('');
      setUf('');
      setGuardian('');
      setReport('');
      setShowForm(false);
      alert('Paciente atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err);
      setError('Erro ao atualizar paciente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
         
      <button className='sign-out-button' onClick={handleSignOut}>Sair</button>

      {showForm && (
        <div className="add-patient-container">
          <h2>{editingPaciente ? 'Editar Paciente' : 'Adicionar Novo Paciente'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form  onSubmit={editingPaciente ? handleUpdate : handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Idade:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              CPF:
              <input
                type="number"
                value={doc}
                onChange={(e) => setDoc(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Gênero:
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
              Data de Nascimento:
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Cidade:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              UF:
              <input
                type="text"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Responsável:
              <input
                type="text"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                required
              />
            </label>
            <br />
            <label className="report-style">
              Relatório:
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? (editingPaciente ? 'Atualizando...' : 'Adicionando...') : (editingPaciente ? 'Atualizar Paciente' : 'Adicionar Paciente')}
            </button>
          </form>
        </div>
      )}

      <img src="health.png" alt="logo.clinicahelp"></img>
      <h2>Pacientes</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Novo Paciente'}
      </button>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>CPF</th>
              <th>Gênero</th>
              <th>CID</th>
              <th>Data de Nascimento</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Responsável</th>
              <th>Relatório</th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>
            {pacientes.length > 0 ? (
              pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.id}</td>
                  <td>{paciente.name}</td>
                  <td>{paciente.age}</td>
                  <td>{paciente.doc}</td>
                  <td>{paciente.gender}</td>
                  <td>{paciente.cid}</td>
                  <td>{paciente.birthday}</td>
                  <td>{paciente.city}</td>
                  <td>{paciente.uf}</td>
                  <td>{paciente.guardian}</td>
                  <td>{paciente.report}</td>
                  <td>
                    <button onClick={() => handleEdit(paciente)}>Editar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Nenhum paciente disponível</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
};

export default Home;
