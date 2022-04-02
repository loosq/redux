import "./App.css";
import React from "react";
import moment from "moment";
import { employees } from "./Employees";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import InputMask from "react-input-mask";

const App = () => {
  const [filteredEmployees, setFilteredEmployees] = React.useState([]);
  // const [sortList, setSortList] = React.useState("az");
  const [roleList, setRoleList] = React.useState("none");
  const [isArchived, setIsArchived] = React.useState(false);

  const sortedByName = (sorting) => {
    if (sortList === "az") {
      const sortedList = [...filteredEmployees].sort((a, b) =>
        a[sorting] > b[sorting] ? 1 : -1
      );
      setFilteredEmployees(sortedList);
      setSortList("aa");
    }

    if (sortList === "aa") {
      const sortedList = [...filteredEmployees].sort((a, b) =>
        a[sorting] < b[sorting] ? 1 : -1
      );
      setFilteredEmployees(sortedList);
      setSortList("az");
    }
  };

  const checkboxSwitcher = () => {
    setIsArchived(!isArchived);
  };

  const sortEmployees = (roleList, isArchived, employees, birthday) => {
    let result = [...employees];

    if (isArchived) {
      result = result.filter(({ isArchive }) => isArchive);
    }

    if (roleList !== "none") {
      result = result.filter(({ role }) => role === roleList);
    }

    if (birthday !== "birthdayInitial") {
      if (birthday === "birthday") {
        result.sort((a, b) =>
          moment(a.birthday, "DD.MM.YYYY") < moment(b.birthday, "DD.MM.YYYY")
            ? 1
            : -1
        );
      }
      if (birthday === "birthdayReverse") {
        result.sort((a, b) =>
          moment(a.birthday, "DD.MM.YYYY") > moment(b.birthday, "DD.MM.YYYY")
            ? 1
            : -1
        );
      }
    }

    setFilteredEmployees(result);
  };

  const [sortList, setSortList] = React.useState("birthdayInitial");

  const sortedByBirth = () => {
    if (sortList === "birthdayInitial") {
      setSortList("birthday");
    } else {
      if (sortList === "birthdayReverse") {
        setSortList("birthday");
        return;
      }
      setSortList("birthdayReverse");
    }
  };

  React.useEffect(() => {
    sortEmployees(roleList, isArchived, employees, sortList);
  }, [roleList, isArchived, sortList]);

  const [addEmployeeData, setAddEmployeeData] = React.useState({
    name: "",
    role: "",
    phone: "",
    birthday: "",
  });

  const addEmployeeHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    const newData = { ...addEmployeeData };
    newData[name] = value;

    setAddEmployeeData(newData);
  };

  const addEmployeeSubmit = (e) => {
    e.preventDefault();
    const addEmployee = {
      name: addEmployeeData.name,
      role: addEmployeeData.role,
      phone: addEmployeeData.phone,
      birthday: addEmployeeData.birthday,
    };

    const newEmployee = [...filteredEmployees, addEmployee];
    setFilteredEmployees(newEmployee);
  };

  return (
    <div>
      <FilterCheckbox
        checkboxSwitcher={checkboxSwitcher}
        archived={isArchived}
      />
      <div className="employees-table">
        <p
          className="employees-table-name"
          onClick={() => sortedByName("name")}
        >
          Имя
        </p>
        <p onClick={() => sortedByBirth()}>Дата рождения</p>
        <label>
          Должность
          <select onChange={(e) => setRoleList(e.target.value)}>
            <option value="none"></option>
            <option value="cook">Cook</option>
            <option value="waiter">Waiter</option>
            <option value="driver">Driver</option>
          </select>
        </label>
        <p>Телефон</p>
      </div>
      <div className="employees-list">
        {filteredEmployees.map((item) => {
          return (
            <ul className="employee" key={item.id}>
              <li className="employee-name">{item.name}</li>
              <li className={item.birthday}>{item.birthday}</li>
              <li className={item.role}>{item.role}</li>
              <li className={item.phone}>{item.phone}</li>
            </ul>
          );
        })}
      </div>

      <form className="add-employee-form" onSubmit={addEmployeeSubmit}>
        <button type="submit">Добавить сотрудника</button>
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          required
          placeholder="Фамилия Имя"
          pattern="[а-яА-ЯёЁa-zA-Z- ]{1,}"
          onChange={addEmployeeHandler}
          title="Фамилия и Имя должны состоять только из букв"
        />
        <input
          list="role"
          name="role"
          placeholder="Должность"
          onChange={addEmployeeHandler}
          autoComplete="off"
          pattern="cook | waiter | driver"
          title="Выберите одно из значений"
        />
        <datalist id="role">
          <option value="cook" />
          <option value="waiter" />
          <option value="driver" />
        </datalist>
        <InputMask
          mask="+7 (999) 999-9999"
          type="text"
          name="phone"
          required
          placeholder="Номер телефона"
          onChange={addEmployeeHandler}
        />
        <InputMask
          mask="99.99.9999"
          type="text"
          name="birthday"
          required
          placeholder="Дата рождения"
          onChange={addEmployeeHandler}
        />
      </form>
    </div>
  );
};

export default App;
