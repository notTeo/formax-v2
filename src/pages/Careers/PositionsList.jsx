export default function PositionsList({ positions }) {
  return (
    <ul className="positions-list">
      {positions.map((position) => (
        <li className="positions-list-item" key={position.id}>
          <h3>{position.title}</h3>
          <p>{position.department}</p>
          <span>{position.type}</span>
        </li>
      ))}
    </ul>
  );
}
