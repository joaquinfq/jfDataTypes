import jfDataTypeBase from './base';

/**
 * Clase para el manejo de objetos.
 *
 *
 * @namespace jf.dataType
 * @class     jf.dataType.Object
 * @extends   jf.dataType.Base
 */
export default class jfDataTypeObject extends jfDataTypeBase
{
    /**
     * Mapea las propiedades de la instancia con nuevos nombres
     * permitiendo cambiar al vuelo la asignación de los valores.
     *
     * @property $propertyMap
     * @type     {Object|null}
     */
    $propertyMap = null;

    /**
     * Configuración de las propiedades de la clase.
     *
     * Es un objeto donde las claves son las propiedades existentes en la clase
     * y el valor es el tipo de datos asignado a esa propiedad.
     *
     * Cada clave debe corresponder con una propiedad definida en la clase.
     *
     * ```
     * class MyType extends jfDataTypeObject
     * {
     *     amount = null;
     *     name = null;
     *     $propertyTypes = {
     *        amount : jfDataTypeMoney,
     *        name   : jfDataTypeString
     *     }
     * }
     * ```
     *
     * @property $propertyTypes
     * @type     {Object|null}
     */
    $propertyTypes = null;

    /**
     * Mapea los valores con nombres de propiedades de la instancia.
     *
     * @method _remap
     *
     * @param {Object} values Valores a remapear.
     *
     * @protected
     */
    _remap(values)
    {
        const _map = this.$propertyMap;
        if (_map && typeof _map === 'object')
        {
            for (let _property of Object.keys(_map))
            {
                const _oldName = _map[_property];
                if (_oldName in values)
                {
                    values[_property] = values[_oldName];
                    delete values[_oldName];
                }
            }
        }

        return values;
    }

    /**
     * @override
     */
    setValue(value)
    {
        if (value && typeof value === 'object')
        {
            const _propertyTpes = this.$propertyTypes;
            if (_propertyTpes && typeof _propertyTpes === 'object')
            {
                const _Class = this.constructor;
                const _value = this._remap(value);
                for (const _property of Object.keys(_value))
                {
                    if (_property in _propertyTpes)
                    {
                        this[_property] = _Class.create(_propertyTpes[_property], _value[_property]);
                    }
                }
            }
        }
        super.setValue(null);
    }

    /**
     * @override
     */
    valueOf()
    {
        const _values = {};
        const _propertyTpes = this.$propertyTypes;
        if (_propertyTpes && typeof _propertyTpes === 'object')
        {
            for (const _name of Object.keys(_propertyTpes))
            {
                const _value = this[_name];
                if (_value !== undefined)
                {
                    _values[_name] = _value instanceof jfDataTypeBase
                        ? _value.value
                        : _value;
                }
            }
        }

        return _values;
    }

    /**
     * @override
     */
    setProperties(values)
    {
        this.setValue(values);
    }
}
//------------------------------------------------------------------------------
jfDataTypeObject.register('Object', jfDataTypeObject);