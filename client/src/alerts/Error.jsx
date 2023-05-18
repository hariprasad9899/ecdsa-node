import React from "react";

export default function Error() {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>Failed!</strong> The password you have entered is not correct
        </div>
    );
}
