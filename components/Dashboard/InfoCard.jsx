//components/Dashboard/InfoCard.jsx

/**
 * InfoCard Component
 *
 * Renders a single information card.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - The title of the card
 * @param {string|number} props.value - The value to display
 * @param {string} props.color - The background color class for the card
 */
const InfoCard = ({ title, value, color }) => (
  // You can adjust the padding (p-2) to make the cards shorter
  // Add width classes (e.g., w-full, max-w-xs) here to adjust card width
  <div className={`p-2 ${color} rounded-lg shadow w-full`}>
    <h3 className="text-xs font-medium text-gray-500 uppercase">{title}</h3>
    <p className="text-lg font-semibold text-gray-700">{value}</p>
  </div>
);

export default InfoCard;
