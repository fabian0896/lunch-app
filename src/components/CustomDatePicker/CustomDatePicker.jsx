import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Form, Input, Message } from 'semantic-ui-react';
import { endOfDay } from 'date-fns';
import { ipcRenderer } from 'electron';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import es from 'date-fns/locale/es';

import './CustomDatePicker.global.css';

registerLocale('es', es);

const CustomDatePicker = ({ onSubmit }) => {
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      dateRange: [null, null],
      path: null,
    },
    onSubmit: async (values, actions) => {
      try {
        await onSubmit(values);
        actions.resetForm();
        setError(false);
      } catch (err) {
        setError(err);
      }
      // eslint-disable-next-line no-alert
    },
  });

  const [startDate, endDate] = formik.values.dateRange;

  useEffect(() => {
    setError(false);
  }, [startDate, endDate]);

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
      <Form error={!!error} onSubmit={formik.handleSubmit}>
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
        <Message error header="Error" content={error.message} />
        <Form.Button
          loading={formik.isSubmitting}
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

CustomDatePicker.propTypes = {
  onSubmit: PropTypes.func,
};
CustomDatePicker.defaultProps = {
  onSubmit: () => {},
};

export default CustomDatePicker;
