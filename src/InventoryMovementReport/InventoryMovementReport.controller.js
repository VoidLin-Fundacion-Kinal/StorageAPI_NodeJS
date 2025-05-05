import Movement from '../InventoryMovement/movement.model.js'
import Products from '../Products/products.model.js'

export const getInventoryMovements = async (req, res) => {
    try {
        const { startDate, endDate, type } = req.body

        // Validar que se proporcionen las fechas
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: 'Las fechas de inicio y fin son requeridas'
            })
        }

        // Convertir las fechas a objetos Date
        const start = new Date(startDate)
        const end = new Date(endDate)

        // Ajustar la fecha final para incluir todo el dia
        end.setHours(23, 59, 59, 999)

        // Crear objeto de filtro
        const filter = {
            date: {
                $gte: start,
                $lte: end
            }
        }

        // Filtrar por entrada o salida
        if (type && ['entrada', 'salida'].includes(type)) {
            filter.type = type
        }

        //Se buscan los movimientos realizados
        const movements = await Movement.find(filter)
            .populate(
                {
                    path: 'product',
                    select: 'name category amount price' 
                }
            )
            .sort(
                { date: -1 })

        res.status(200).json(
            {
                message: 'Movimientos encontrados',
                total: movements.length,
            }
        )

    } catch (e) {
        console.error('Error al obtener movimientos:', e)
        res.status(500).json(
            {
                message: 'Error interno del servidor',
                e
            }
        )
    }
}