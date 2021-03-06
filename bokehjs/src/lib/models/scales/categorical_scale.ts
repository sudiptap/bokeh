import {Scale} from "./scale"
import {FactorRange} from "../ranges/factor_range"
import {Arrayable, ScreenArray, FloatArray} from "core/types"
import * as p from "core/properties"

export namespace CategoricalScale {
  export type Attrs = p.AttrsOf<Props>

  export type Props = Scale.Props
}

export interface CategoricalScale extends CategoricalScale.Attrs {}

export class CategoricalScale extends Scale {
  properties: CategoricalScale.Props

  constructor(attrs?: Partial<CategoricalScale.Attrs>) {
    super(attrs)
  }

  source_range: FactorRange

  get s_compute(): (x: number) => number {
    const [factor, offset] = this._linear_compute_state()
    const range = this.source_range
    return (x) => factor*range.synthetic(x) + offset
  }

  compute(x: any): number {
    return super._linear_compute(this.source_range.synthetic(x))
  }

  v_compute(xs: Arrayable<any>): ScreenArray {
    return super._linear_v_compute(this.source_range.v_synthetic(xs))
  }

  invert(xprime: number): number {
    return this._linear_invert(xprime)
  }

  v_invert(xprimes: Arrayable<number>): FloatArray {
    return this._linear_v_invert(xprimes)
  }
}
