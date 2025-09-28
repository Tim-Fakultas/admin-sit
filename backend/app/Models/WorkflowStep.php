<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkflowStep extends Model
{
    public function workflow()
    {
        return $this->belongsTo(Workflow::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
