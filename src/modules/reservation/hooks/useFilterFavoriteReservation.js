import {useState, useEffect} from 'react';
import moment from 'moment/min/moment-with-locales';

export const useFilterReservation = () => {
  const [filterModalDays, setFilterModalDays] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    dayN: '', //La fecha en numero
    dayD: '', //el día
    month: '',
    year: '',
    hour: '',
    min: '',
    seg: '',
  });
  const [selectedDate, setSelectedDate] = useState({
    //PARA FILTRAR LAS CANCHAS
    dayN: '', //La fecha en numero
    dayD: '', //el día
    month: '',
    year: '',
    hourInitial: '',
    hourFinal: '',
    valueInitial: '',
    valueFinal: '',
    valueSize: 0, //PARA EL TAMAÑO DE LA CANCHA
  });

  useEffect(() => {
    const currentD = moment()
      .locale('es')
      .format('D ddd M YYYY, H:mm:ss')
      .split(' ');
    setCurrentDate({
      dayN: currentD[0],
      dayD: currentD[1],
      month: currentD[2],
      year: currentD[3],
      hour: currentD[4].split(':')[0],
      min: currentD[4].split(':')[1],
      seg: currentD[4].split(':')[2],
    });

    setSelectedDate({
      ...selectedDate,
      //LA FECHA QUE SE SELECCIONA AL INICIAR Y QUE SE MOSTRARÁ EN EL MODAL COMOM SELECCIONADO
      dayN: currentD[0],
      dayD: currentD[1],
      month: currentD[2],
      monthN: currentD[2],
      year: currentD[3],
      hourInitial: (1 * currentD[4].split(':')[0] + 1).toString() + ':00',
      valueInitial: 1 * currentD[4].split(':')[0] + 1,
      valueFinal: 1 * currentD[4].split(':')[0] + 2,
    });

    getFilterDays();
  }, []);

  const getFilterDays = async function () {
    let days = [];
    for (let i = 0; i < 8; i++) {
      let day = moment()
        .add(i, 'd')
        .locale('es')
        .format('D ddd MMM YYYY')
        .split(' ');
      let day2 = moment()
        .add(i, 'd')
        .locale('es')
        .format('D ddd M YYYY')
        .split(' ');
      days = [
        ...days,
        {
          dayN: day[0],
          dayD: day[1],
          selected: i == 0 ? true : false,
          month: day[2],
          monthN: day2[2],
          year: day[3],
          id: i.toString(),
        },
      ];
    }

    setFilterModalDays([...days]);
  };

  return {
    currentDate,
    filterModalDays,
    selectedDate,
  };
};
