import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Form, Input } from 'semantic-ui-react';

import es from 'date-fns/locale/es';
import './CustomDatePicker.global.css';

registerLocale('es', es);

const CustomDatePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleChange = (update) => {
    console.log(update);
    setDateRange(update);
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onChange={handleChange}
            locale="es"
            showPreviousMonths
            selectsRange
            withPortal
            customInput={<Input />}
          />
        </Form.Field>
        <Form.Button type="submit" fluid content="Generar Reporte" primary />
      </Form>
    </div>
  );
};

export default CustomDatePicker;
