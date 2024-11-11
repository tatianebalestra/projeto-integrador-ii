import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'


const PatientsCard = ({paciente, onDelete}) => {

    const handleDelete = async() => {
        const {data, error} = await supabase
            .from('Pacientes')
            .delete()
            .eq('id', paciente.id)
            .select()

        if(error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            onDelete(paciente.id)
        }
    }
    return (
        <div className="patient-card">
            <table className="patientes-table">
           <thead>
             <tr>
               <th>ID</th>
               <th>Nome</th>
               <th>Idade</th>
               <th>Documento</th>
               <th>CID</th>
               <th>Data de Nascimento</th>
               <th>Responsável</th>
              
             </tr>
           </thead>
           <tbody>
             {pacientes.map((paciente) => (
               <tr key={paciente.id} paciente={paciente} onDelete={handleDelete}>
                 <td>{paciente.id}</td>
                 <td>{paciente.name}</td>
                 <td>{paciente.age}</td>
                 <td>{paciente.doc}</td>
                 <td>{paciente.cid}</td>
                 <td>{paciente.birthday}</td>
                 <td>{paciente.guardian}</td>
                
               </tr>
             ))}
           </tbody>
         </table>
            <div className="buttons">
                <Link to={'/' + paciente.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default PatientsCard