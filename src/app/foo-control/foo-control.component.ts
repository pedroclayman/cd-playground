import { ChangeDetectionStrategy, Component, forwardRef, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoopNgZone } from '@angular/core/src/zone/ng_zone';

const noop = () => {};

const ngValueProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FooControlComponent),
    multi: true,
};

@Component({
    selector: 'app-foo-control',
    templateUrl: './foo-control.component.html',
    styleUrls: ['./foo-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ngValueProvider],
})
export class FooControlComponent<T> implements ControlValueAccessor, DoCheck {
    constructor(private changeDetector: ChangeDetectorRef) {}

    private _innerModel: T;
    public get innerModel(): T {
        return this._innerModel;
    }
    public set innerModel(value: T) {
        if (this._innerModel !== value) {
            this._innerModel = value;

            this.onChangedCallback(this._innerModel);
        }
    }
    onTouchedCallback: () => void = noop;
    onChangedCallback: (arg: T) => void = noop;

    ngDoCheck() {
        console.log('check');
    }

    writeValue(value: T): void {
        this._innerModel = value;

        // this mark for check is necessary in combination with OnPush strategy
        // since otherwise no input changes on this component and therefore no changes
        // are propagated into the view
        this.changeDetector.markForCheck();
    }
    registerOnChange(fn: any): void {
        this.onChangedCallback = fn || noop;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn || noop;
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }
}
