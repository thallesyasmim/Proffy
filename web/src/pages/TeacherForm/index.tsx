import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {

  const history = useHistory();
  
  const scheduleItemInitial = [
    { week_day: 0, from: '', to: '' },
  ]


  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems ] = useState(scheduleItemInitial);


  function addNewSchedule() {
    setScheduleItems([
      ...scheduleItems,
     { week_day: 0, from: '', to: '' } 
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return {...scheduleItem, [field]: value}
      }

      return scheduleItem;
    })

    setScheduleItems(updateScheduleItem);    

  }

  function handleCreateClasses(event: FormEvent) {
    event.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => { 
      
      alert('Cadastro realizado com sucesso');
  
      console.log({
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      });

      history.push('/');

  }).catch(() => {
    alert('Erro ao realizar o cadastro.');
  });
 
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição."
        />

      <main>
        <form onSubmit={handleCreateClasses}>
        <fieldset>
          <legend>Seus dados</legend>

          <Input name="name" label="Nome completo" value={name} onChange={(event) => { setName(event.target.value); }}/>
          <Input name="avatar" label="Avatar" value={avatar} onChange={(event) => { setAvatar(event.target.value); }} />
          <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(event) => { setWhatsapp(event.target.value); }} />
          <Textarea name="bio" label="Biografia" value={bio} onChange={(event) => { setBio(event.target.value); }} />

        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>


          <Select 
            name="subject" 
            value={subject} 
            onChange={(event) => { setSubject(event.target.value); }}
            label="Matéria" 
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
          <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(event) => { setCost(event.target.value); }} />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewSchedule}>+ Novo Horário</button>
          </legend>

           {scheduleItems.map((schedule, index) => (
              <div key={schedule.week_day} className="schedule_item">            
                <Select 
                  name="week_day" 
                  label="Dia da semana" 
                  value={schedule.week_day}
                  onChange={(event) => { setScheduleItemValue(index, 'week_day', event.target.value); }}
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
                <Input name="from" label="Das" type="time" value={schedule.from} onChange={(event) => { setScheduleItemValue(index, 'from', event.target.value); }} />
                <Input name="to" label="Até" type="time" value={schedule.to} onChange={(event) => { setScheduleItemValue(index, 'to', event.target.value); }} />
            </div>
           ))}

        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante!" />
            Importante <br />
            Preencha todos os dados
          </p>
          <button type="submit">Salvar cadastro</button>
        </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
