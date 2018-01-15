import jfDataTypeDateTime from './date-time';

/**
 * Clase para el manejo de fechas.
 *
 *
 * @namespace jf.dataType
 * @class     jf.dataType.Date
 * @extends   jf.dataType.DateTime
 */
export default class jfDataTypeDate extends jfDataTypeDateTime
{
    /**
     * @override
     */
    static defaultFormat = 'yyyy-MM-dd';

    /**
     * @override
     */
    toJSON()
    {
        const _value = this.value;

        return _value === null
            ? super.toJSON()
            : this.constructor.formatDate(_value, 'yyyy-MM-dd');
    }
}
//------------------------------------------------------------------------------
jfDataTypeDate.register('Date', jfDataTypeDate);