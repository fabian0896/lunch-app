import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Form, Input } from 'semantic-ui-react';
import { endOfDay } from 'date-fns';
import { ipcRenderer } from 'electron';
import { useFormik } from 'formik';

import es from 'date-fns/locale/es';

import { database } from '../../services/database';

import './CustomDatePicker.global.css';

registerLocale('es', es);

const CustomDatePicker = () => {
  const formik = useFormik({
    initialValues: {
      dateRange: [null, null],
      path: null,
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      const { Company } = database();
      const reportData = await Company.getReportData(values.dateRange);
      console.log(JSON.stringify(reportData));
      formik.resetForm();
      // eslint-disable-next-line no-alert
      alert('El reporte se  guardo correctamente');
    },
  });

  const [startDate, endDate] = formik.values.dateRange;

  const handleChange = (update) => {
    const [start, end] = update;
    let newEnd = end;
    if (newEnd) {
      newEnd = endOfDay(newEnd);
    }
    formik.setFieldValue('dateRange', [start, newEnd]);
  };

  const handleSelectSavePath = async () => {
    const path = await ipcRenderer.invoke('get-save-path');
    if (!path) {
      formik.resetForm();
      return;
    }
    formik.setFieldValue('path', path);
    formik.submitForm();
  };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <DatePicker
            placeholderText="Selecciona fecha del reporte"
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
        <Form.Button
          disabled={!endDate}
          onClick={handleSelectSavePath}
          type="button"
          fluid
          content="Generar Reporte"
          primary
        />
      </Form>
    </div>
  );
};

export default CustomDatePicker;
