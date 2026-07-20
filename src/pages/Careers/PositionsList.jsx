import { useLanguage } from "../../context/LanguageContext";

export default function PositionsList({ positions }) {
  const { lang } = useLanguage();

  return (
    <ul className="positions-list">
      {positions.map((position) => (
        <li className="positions-list-item" key={position.id}>
          <h3>{position.title[lang]}</h3>
          <p>{position.department[lang]}</p>
          <span>{position.type[lang]}</span>
        </li>
      ))}
    </ul>
  );
}
