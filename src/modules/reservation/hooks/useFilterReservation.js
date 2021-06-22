import {useState, useEffect} from 'react';
import moment from 'moment/min/moment-with-locales';

export const useFilterReservation = (dispatch, getData, idBusiness) => {
  //FUNCION QUE TRAE LAS CANCHAS
  const [filterModalDays, setFilterModalDays] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
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
  const [rentalHour, setRentalHour] = useState(1);
  const [sport, setSport] = useState('Futbol');
  const [filterHours, setFilterHours] = useState([
    {
      id: '1',
      initial: '6:00',
      final: '7:00',
      valueInitial: 6,
      valueFinal: 7,
    },
    {
      id: '2',
      initial: '7:00',
      final: '8:00',
      valueInitial: 7,
      valueFinal: 8,
    },
    {
      id: '3',
      initial: '8:00',
      final: '9:00',
      valueInitial: 8,
      valueFinal: 9,
    },
    {
      id: '4',
      initial: '9:00',
      final: '10:00',
      valueInitial: 9,
      valueFinal: 10,
    },
  ]);

  useEffect(() => {
    const data = {
      day: moment(
        `${selectedDate.year.slice(0, 4)}-${selectedDate.monthN}-${
          selectedDate.dayN
        }`,
        'YYYY-MM-DD',
      ).format('YYYY/MM/DD'),
      start: selectedDate.valueInitial,
      end: selectedDate.valueFinal,
      size: selectedDate.valueSize,
      business: idBusiness,
    };

    if (data.day != 'Invalid date') {
      dispatch(getData(data));
    }
  }, [selectedDate, rentalHour]);

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

    const filters = updateDate2(1 * currentD[4].split(':')[0] + 1, rentalHour);

    setFilterHours([...filters]);

    getFilterDays();
  }, []);

  const updateDate2 = function (valueInitial, rentalHour) {
    const hourRange = 18 / 1;
    const filters = [];
    let hourInitial = 6;

    hourInitial = valueInitial.toString().includes('.5') ? 6.5 : 6;

    for (let i = 0; i < hourRange; i++) {
      if (hourInitial < 24) {
        filters.push({
          valueInitial: hourInitial,
          valueFinal:
            hourInitial + rentalHour > 24 ? 24 : hourInitial + rentalHour,
          id: i,
        });

        hourInitial = hourInitial + 1;

        filters[i].initial = filters[i].valueInitial.toString().includes('.5')
          ? filters[i].valueInitial.toString().replace('.5', ':30')
          : filters[i].valueInitial.toString() + ':00';
        filters[i].final = filters[i].valueFinal.toString().includes('.5')
          ? filters[i].valueFinal.toString().replace('.5', ':30')
          : filters[i].valueFinal.toString() + ':00';
      }
    }

    return filters;
  };

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
    rentalHour,
    setRentalHour,
    sport,
    setSport,
    filterHours,
    setFilterHours,
    currentDate,
    modalOpened,
    setModalOpened,
    selectedDate,
    setSelectedDate,
    updateDate2,
    filterModalDays,
    setFilterModalDays,
  };
};
