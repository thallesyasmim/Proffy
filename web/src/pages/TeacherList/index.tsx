import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';


function TeacherList() {

  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    console.log({
        subject,
        week_day,
        time
      });

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    console.log(response.data);

    setTeachers(response.data);

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>   

        <Select 
            name="subject" 
            label="Matéria" 
            value={subject}
            onChange={(event) => { setSubject(event.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Português', label: 'Português' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Educação Física', label: 'Educação Fisíca' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Física', label: 'Física' },
              { value: 'História', label: 'História' },
              { value: 'Química', label: 'Química' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Filosofia', label: 'Filosofia' }
            ]}
            
            />

        <Select 
            name="week_day" 
            label="Dia da semana" 
            value={week_day}
            onChange={(event) => { setWeek_day(event.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda' },
              { value: '2', label: 'Terça' },
              { value: '3', label: 'Quarta' },
              { value: '4', label: 'Quinta' },
              { value: '5', label: 'Sexta' },
              { value: '6', label: 'Sábado' }
            ]}
            
            />
            <Input type="time" name="time" label="Hora"  
            value={time}
            onChange={(event) => { setTime(event.target.value) }} />

            <button type="submit">
              Filtrar
            </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
