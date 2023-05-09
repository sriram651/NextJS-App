// This component was previously used to make button component cutomization easier
// But since only 3 buttons were used in the whole application, it is not currently used anywhere in the code.
const Button = ({content, classNames}) => {
    return <button className={classNames}>{content}</button>
}
 
export default Button;