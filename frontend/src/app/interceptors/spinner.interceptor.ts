import { inject } from "@angular/core"
import { SpinnerService } from "../services/spinner.service"
import { finalize } from "rxjs";
import { HttpInterceptorFn } from "@angular/common/http";

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinnerSvc = inject(SpinnerService);
    const MINIMUM_SPINNER_TIME = 750;

    spinnerSvc.show();

    const startTime = Date.now();

    return next(req).pipe(
        finalize(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(MINIMUM_SPINNER_TIME - elapsedTime, 0);

            setTimeout(() => {
                spinnerSvc.hide();
            }, remainingTime);
        })
    );
}